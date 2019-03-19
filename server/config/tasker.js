const schedule = require('node-schedule');
const {getAuctions, updateAuctions, loadPendingAuctions, emitAuctions} = require('../api/controllers/auction.controller');

const TASKS = {
    UPDATE_AUTIONS_STATE: 'UPDATE_AUTIONS_STATE',
    LOAD_PENDING_AUCTIONS: 'LOAD_PENDING_AUCTIONS',
    EMIT_AUCTIONS: 'TASKS.EMIT_AUCTIONS'
};

const taskCoordination = [
    TASKS.UPDATE_AUTIONS_STATE,
    TASKS.LOAD_PENDING_AUCTIONS,
    TASKS.EMIT_AUCTIONS
];

const taskerExecutor = async (taskCoordination) => {
    for(let task of taskCoordination) {
        await TASK_DEFINITION[task]();
    }
};

const TASK_DEFINITION = {
    [TASKS.UPDATE_AUTIONS_STATE]: async () => {
        console.log(`${[TASKS.UPDATE_AUTIONS_STATE]} task running`);
        await updateAuctions(getAuctions());
    },
    [TASKS.LOAD_PENDING_AUCTIONS]: async () => {
        console.log(`${[TASKS.LOAD_PENDING_AUCTIONS]} task running`);
        await loadPendingAuctions(getAuctions());
    },
    [TASKS.EMIT_AUCTIONS]: async () => {
        console.log(`${[TASKS.EMIT_AUCTIONS]} task running`);
        await emitAuctions();
    }
};

// setup job to add all pending auctions and adjust auction prices
exports.taskerInit = () => {
    schedule.scheduleJob('*/1 * * * *', () => {
        taskerExecutor(taskCoordination);
    });
};