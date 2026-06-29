import User from "../model/User.js";

const cleanedPayload = (body) => {
  const { passwordHash, isAdmin, sellerProfile, ...safeData } = body;
  return safeData;
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-passwordHash -isAdmin -sellerProfile",
    );
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const putUserData = async (req, res) => {
  try {
    const payload = cleanedPayload(req.body);
    if (req.file) payload.profileImage = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, payload, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ success: false, error: "User not found" });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const postUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const newAddress = cleanedPayload(req.body);

    if (newAddress.isPrimary !== true) {
      await User.updateOne({ _id: userId }, { $push: { address: newAddress } });
      return res.status(200).json({ success: true });
    }

    await User.updateOne(
      { _id: userId, "address.isPrimary": true },
      { $set: { "address.$.isPrimary": false } },
    );

    await User.updateOne({ _id: userId }, { $push: { address: newAddress } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const postUserPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const newPayment = cleanedPayload(req.body);

    if (newPayment.isDefault !== true) {
      await User.updateOne(
        { _id: userId },
        { $push: { paymentMethod: newPayment } },
      );
      return res.status(200).json({ success: true });
    }

    await User.updateOne(
      { _id: userId, "paymentMethod.isDefault": true },
      { $set: { "paymentMethod.$.isDefault": false } },
    );

    await User.updateOne(
      { _id: userId },
      { $push: { paymentMethod: newPayment } },
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const putUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const updatedAddress = cleanedPayload(req.body);

    if (updatedAddress.isPrimary === true) {
      await User.updateOne(
        { _id: userId, "address.isPrimary": true },
        { $set: { "address.$.isPrimary": false } },
      );
    }

    const updateFields = {};
    for (const [key, value] of Object.entries(updatedAddress)) {
      updateFields[`address.$.${key}`] = value;
    }

    const result = await User.updateOne(
      { _id: userId, "address._id": addressId },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Address entry not found." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const putUserPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentId = req.params.id;
    const updatedPayment = cleanedPayload(req.body);

    if (updatedPayment.isDefault === true) {
      await User.updateOne(
        { _id: userId, "paymentMethod.isDefault": true },
        { $set: { "paymentMethod.$.isDefault": false } },
      );
    }

    const updateFields = {};
    for (const [key, value] of Object.entries(updatedPayment)) {
      updateFields[`paymentMethod.$.${key}`] = value;
    }

    const result = await User.updateOne(
      { _id: userId, "paymentMethod._id": paymentId },
      { $set: updateFields },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Payment method not found." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { address: { _id: addressId } } },
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Address not found or already deleted.",
        });
    }

    return res
      .status(200)
      .json({ success: true, message: "Address deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUserPaymentMethod = async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentId = req.params.id;

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { paymentMethod: { _id: paymentId } } },
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Payment method not found or already deleted.",
        });
    }

    return res
      .status(200)
      .json({ success: true, message: "Payment method deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
