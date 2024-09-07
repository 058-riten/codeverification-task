const VerificationCode = require('../models/VerificationCode')

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.codeGenerator = async (req, res) => {
    const verificationCode = generateVerificationCode();

    try {
        const newCode = new VerificationCode({ code: verificationCode });
        console.log(newCode)
        await newCode.save();

        res.status(200).json({ code: verificationCode });
    } catch (error) {
        res.status(500).json({ message: 'Error generating code. Please try again.' });
    }
};


exports.codeVerification = async (req, res) => {
    const { code } = req.body;

    if (!code || code.length !== 6) {
        return res.status(400).json({ message: 'Code must be exactly 6 digits.' });
    }

    if (!/^\d+$/.test(code)) {
        return res.status(400).json({ message: 'Code must contain only numeric digits.' });
    }

    try {
        const storedCode = await VerificationCode.findOne({ code });

        if (!storedCode) {
            return res.status(400).json({ message: 'Invalid or expired code.' });
        }

        if (code[5] === '7') {
            return res.status(400).json({ message: 'Invalid code: last digit cannot be 7.' });
        }

        res.status(200).json({ message: 'Code is valid.' });

        await VerificationCode.deleteOne({ code });

    } catch (error) {
        res.status(500).json({ message: 'Error verifying code. Please try again.' });
    }
};
