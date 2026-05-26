const User = require("../models/User");

class UserController {

    getAll = async (req, res) => {
        const users = await User.find();

        res.status(200).json({ data: users });
    };


    getById = async (req, res) => {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) return res.status(404).json("This User Not Found");

        res.status(200).json({ data: user });
    };


    add = async (req, res) => {

        const {
            name,
            email,
            phone,
            password,
            registeredAt,
            role,
            address,
            dateOfBirth,
            membershipNumber,
            responsibleDepartment
        } = req.body;

        const data = await User.create({
            name,
            email,
            phone,
            password,
            registeredAt,
            role,
            address,
            dateOfBirth,
            membershipNumber,
            responsibleDepartment
        });

        res.status(201).json({ data });
    };


    update = async (req, res) => {

        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) return res.status(404).json("This User Not Found");

        const {
            name,
            email,
            phone,
            password,
            address,
            dateOfBirth,
            membershipNumber,
            responsibleDepartment
        } = req.body;

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
        user.password = password ?? user.password;
        user.address = address ?? user.address;
        user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;
        user.membershipNumber = membershipNumber ?? user.membershipNumber;
        user.responsibleDepartment = responsibleDepartment ?? user.responsibleDepartment;

        await user.save();

        res.status(200).json({ data: user });
    };


    remove = async (req, res) => {

        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        if (!user) return res.status(404).json("This User Not Found");

        res.status(200).json({ data: null });
    };


    pagination = async (req, res) => {

        const page = req._page;
        const limit = req._limit;

        const total = await User.countDocuments();

        const pages = Math.ceil(total / limit);

        const data = await User
            .find()
            .skip((page - 1) * limit)
            .limit(limit);

        const isPrev = page > 1;
        const isNext = page < pages;

        res.status(200).json({
            total,
            pages,
            page,
            isPrev,
            isNext,
            data
        });
    };

}

module.exports = new UserController();