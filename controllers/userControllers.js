const User = require("../models/userModel");

exports.createInfluencer = async (req, res) => {
  try {
    const { name, socialMedia, followers, socialMediaLink, socialMediaType } =
      req.body;

    let user = await User.findOne({ socialMedia, socialMediaType });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Influencer's social media already exists",
      });
    }
    let users = await User.find({ name });
    console.log(users.length);
    if (users.length > 0) {
      user = await User.create({
        name: name + users.length,
        socialMedia,
        followers,
        socialMediaLink,
        socialMediaType,
      });
      res.status(201).json({
        success: true,
        user,
        message: "Influencer created",
        socialMediaLink,
        socialMediaType,
        warning:
          "Influencer with same name is exist created influencer with numberd name",
      });
    } else {
      user = await User.create({
        name,
        socialMedia,
        followers,
        socialMediaLink,
        socialMediaType,
      });
      res.status(201).json({
        success: true,
        user,
        message: "Influencer created",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllInfluencers = async (req, res) => {
  try {
    const influencers = await User.find({});
    res.status(200).json({
      success: true,
      influencers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateInfluencer = async (req, res) => {
  try {
    let influencer = await User.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    influencer = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      influencer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteInfluencer = async (req, res) => {
  try {
    let influencer = await User.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
      });
    }

    influencer.remove();

    res.status(200).json({
      success: true,
      message: "Influencer deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.searchInfluencer = async (req, res) => {
  try {
    let influencers = await User.find({
      $or: [
        { name: { $regex: req.params.key } },
        { socialMedia: { $regex: req.params.key } },
      ],
    });

    res.status(200).json({
      success: true,
      influencers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
