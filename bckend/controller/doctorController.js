const Doctor=require("../models/doctorModel");


const doctors=async (req, res) => {
    const { specialization, search, sort } = req.query;

    try {
        let doctors;

        if (specialization) {
            doctors = await Doctor.find({ specialization });
        } else if (search) {
            doctors = await Doctor.find({
                name: { $regex: new RegExp(search, 'i') },
            });
        } else if (sort === 'date') {
            doctors = await Doctor.find().sort({ date: 'asc' });
        } else {
      
            doctors = await Doctor.find();
        }
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch doctors.' });
    }
}
    
const appointment=  async (req, res) => {
        const doctorData = req.body;
        try {
            const newDoctor = await Doctor.create(doctorData);
            res.json({message:"doctor created successfully ",newDoctor});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create a doctor.' });
        }
    }
    
    
const updateDoctor= async (req, res) => {
    const doctorId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });
        res.json({message:"updated successfully",updatedDoctor});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update doctor information.' });
    }
}


const deleteDoctor= async (req, res) => {
    const doctorId = req.params.id;
    try {
        await Doctor.findByIdAndDelete(doctorId);
        res.json({ message: 'Doctor removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete doctor.' });
    }
};  

    module.exports={
        doctors,
        appointment,
        updateDoctor,
        deleteDoctor
    }