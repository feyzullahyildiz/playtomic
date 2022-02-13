const express = require('express');

const router = express.Router();
let index = 0;
const getId = () => index++;
const dataList = [];

router.get('/', (req, res, next) => {
    try {
        const userId = res.locals.user.id;
        const data = dataList
            .filter(item => item.userId === userId)
            .map(({ id, text }) => ({ id, text }))
        res.json(data)
    } catch (error) {

    }
})
router.post('/', (req, res, next) => {
    try {
        const userId = res.locals.user.id;
        const text = (req.body.text + '' || '?').substring(0, 50);
        const id = getId();
        const item = { id, text, userId };
        dataList.push(item);
        res.json(item);
    } catch (error) {
        next(error);
    }
})
router.delete('/:id', (req, res, next) => {
    try {
        const id = +req.params.id;
        if (isNaN(id)) {
            throw new Error('paramater is not a number')
        }
        const index = dataList.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Note could not found');
        }
        const item = dataList[index];

        const userId = res.locals.user.id;
        if (userId !== item.userId) {
            throw new Error('this is not your note, you cannot delete it')
        }
        dataList.splice(index, 1);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

module.exports = {
    noteRouter: router
}