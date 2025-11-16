const Group = require('../models/Group');
const Trip = require('../models/Trip');

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const group = await Group.create({
      name,
      description,
      members: [
        {
          userId: req.user.id,
          role: 'owner',
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('members.userId', 'name email')
      .populate('trips');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is a member
    const isMember = group.members.some(
      (member) => member.userId._id.toString() === req.user.id
    );
    if (!isMember) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is admin or owner
    const userMember = group.members.find(
      (member) => member.userId.toString() === req.user.id
    );
    if (!userMember || !['owner', 'admin'].includes(userMember.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if member already exists
    const existingMember = group.members.find(
      (member) => member.userId.toString() === userId
    );
    if (existingMember) {
      return res.status(400).json({ message: 'Member already in group' });
    }

    group.members.push({ userId, role: 'member' });
    await group.save();

    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

exports.getGroupTrips = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is a member
    const isMember = group.members.some(
      (member) => member.userId.toString() === req.user.id
    );
    if (!isMember) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const trips = await Trip.find({ groupId: req.params.id });

    res.json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

