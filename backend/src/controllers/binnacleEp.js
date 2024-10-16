const Binnacle = require("./../models/binnacleEp.js")
const Assignment = require('../models/assignment');
const axios = require('axios');

const xtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjFkMTliNzFlN2Q4ZTBiNGI2NDE4ZiIsInJvbCI6IkNPT1JESU5BRE9SIiwiZW1haWwiOiJldGFwYXNwcnVlYmFzQGdtYWlsLmNvbSIsInN1cGVyIjowLCJpYXQiOjE3MjcxMzc3MDYsImV4cCI6MTcyNzMxMDUwNn0.UyTMrdtdJAO4_VzB_B_fLiOylrWBYUGviGmC4pIATsI'

const binnacleController = {
    // listar todas las bitácoras
    getListAllBinnacles: async (req, res) => {
        try {
            const ListAllBinnacles = await Binnacle.find()
            .populate({ path: 'assignment' })
            .exec()
            res.json({ ListAllBinnacles  })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácoras" })
        }
    },
    // listar bitácoras por ID
    getListBinnacleById: async (req, res) => {
        try {
            const id = req.params.id;
            const binnacle = await Binnacle.findById(id);
            res.json({ binnacle });
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora o al obtener instructor" });
        }
    },
    // listar bitácoras por asignación 
    getListBinnaclesByAssignment: async (req, res) => {
        try {
            const assignment = req.params.assignment
            const listBinnaclesByAssignment = await Binnacle.find({ assignment })
            res.json({ listBinnaclesByAssignment })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácora" })
        }
    },
    // listar bitácoras por instructor
    getListBinnaclesByInstructor: async (req, res) => {
        try {
            const instructor = req.params.instructor;
            const binnacles = await Binnacle.find({ instructor });
            res.json({ binnacles });
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al listar bitácoras o al obtener instructor" });
        }
    },
    // crear bitácoras
    postAddBinnacle: async (req, res) => {
        try {
            const { assignment, instructor, number, document, observations } = req.body;
            const instructorResponse = await axios.get(`${process.env.INSTRUCTOR_URL}/${instructor}`, {
                headers: {
                    'token': process.env.TOKEN
                }
            });
            const assignmentResponse = await Assignment.findById(assignment)
            const instructorData = instructorResponse.data;

            const newBinnacle = new Binnacle({ assignment: assignmentResponse, instructor: instructorData, number, document, observations });
            await newBinnacle.save();
            res.json({ newBinnacle });
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al crear bitácora o al obtener instructor" });
        }
    },
    // modificar bitácoras
    putUpdateBinnacle: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, newData, { new: true })
            res.json({ updatedBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar bitácora" })
        }
    },
    // modifica el estado de la bitácora
    putUpdateStatus: async (req, res) => {
        try {
            const id = req.params.id
            const status = req.params.status
            const updatedBinnacle = await Binnacle.findByIdAndUpdate(id, { status }, { new: true })
            res.json({ updatedBinnacle })
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: "Error al modificar bitácora" })
        }
    }
}
module.exports = binnacleController