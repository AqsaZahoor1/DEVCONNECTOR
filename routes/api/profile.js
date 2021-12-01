const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');


router.get('/me', authMiddleware, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        return res.json(profile);

    } catch (error) {

        res.status(500).send(error.message);

    }

});


//posting and updating profile data.

router.post(
    '/', [authMiddleware,
    [
        check('status', 'status is required').not().isEmpty(),
        check('skills', 'skills is required').not().isEmpty(),

    ]
]
    ,
    async (req, res) => {
        //return if errors  in  validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            facebook,
            linkedin,
            instagram,
            twitter
        } = req.body;

        // Building profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        console.log(profileFields.user);
        if (company) {
            profileFields.company = company;
        }
        if (website) {
            profileFields.website = website;
        }
        if (location) {
            profileFields.location = location;
        }
        if (status) {
            profileFields.status = status;
        }
        if (bio) {
            profileFields.bio = bio;
        }
        if (githubusername) {
            profileFields.githubusername = githubusername;
        }
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        console.log(profileFields.skills);


        // Building profile object
        profileFields.social = {};
        if (youtube) {
            profileFields.social.youtube = youtube;
        }
        if (facebook) {
            profileFields.social.facebook = facebook;
        }
        if (linkedin) {
            profileFields.social.linkedin = linkedin;
        }
        if (instagram) {
            profileFields.social.instagram = instagram;
        }
        if (twitter) {
            profileFields.social.twitter = twitter;
        }


        try {
            //Update
            let profile = await Profile.findOne({ user: req.user.id }).populate(
                'user',
                ['name', 'avatar']
            );
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);





        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);

router.get('/', async (req, res) => {

    try {

        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        //  res.json("profiles");

        if (profiles) {
            return res.json(profiles);
        }
        else {
            return res.json({ msg: " no profile found " });
        }

    } catch (error) {

        res.status(500).send("Server Error")

    }

});

//Get profile by user id
router.get('/users/:user_id', async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        //  res.json("profiles");

        if (!profile) {
            return res.status(400).json({ msg: "profile not found" });
        }

        return res.send(profile);

    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "profile not found" });
        }

        res.status(500).send("Server Error")

    }

});


//Delete profile and user
router.delete('/', authMiddleware, async (req, res) => {

    try {

        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        //  res.json("profiles");

        return res.json({ msg: "Profile deleted" });

    } catch (error) {

        res.status(500).send("Server Error")

    }

});

// Add Experience

router.put(
    '/experience', [authMiddleware,
    [
        check('title', 'title is required').not().isEmpty(),
        check('company', 'company is required').not().isEmpty(),
        check('from', 'from is required').not().isEmpty()

    ]
]
    ,
    async (req, res) => {
        //return if errors  in  validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        // Building profile object
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };


        try {
            //Update
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            return res.json(profile);

        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);


// Delete Experience
router.delete('/experience/:exp_id', authMiddleware, async (req, res) => {

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = await profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        return res.json(profile);

    } catch (error) {

        res.status(500).send("Server Error")

    }

});


// Add Education

router.put(
    '/education', [authMiddleware,
    [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From of study is required').not().isEmpty()

    ]
]
    ,
    async (req, res) => {
        //return if errors  in  validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        // Building profile object
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };


        try {
            //Update
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            return res.json(profile);

        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
);


// Delete Education
router.delete('/education/:edu_id', authMiddleware, async (req, res) => {

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = await profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);

        await profile.save();
        return res.json(profile);

    } catch (error) {

        res.status(500).send("Server Error")

    }

});



//Get profile by user id
router.get('/github/:username', async (req, res) => {

    try {

        const options = {
            uri: 'https://api.github.com/users/' + req.params.username + '/repos?per_page=5&sort=created:asc&client_id=' + config.get("githubClientId") + '&client_secret=' + config.get("githubSecret") + '',
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        console.log(options.uri);
        request(options, (error, response, body) => {
            if (error)
                console.log(error);
            if (response.statusCode != 200)
                res.status(404).send("No github profile found");
            res.send(JSON.parse(body));
        })


    } catch (error) {



        return res.status(500).send(error.message);

    }

});


module.exports = router;


//splice() adds and/or removes array elements. splice() overwrites the original array
//unshift() method is used to add one or more elements to the beginning of the given array