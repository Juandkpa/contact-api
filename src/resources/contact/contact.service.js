const log = (action)  => {
    console.log('performing ', action);
}
const get = () => {
    log('get');
}; 

const save = () => {
    log('save');
};

const update = () => {
    log('update');
};

const remove = () => {
    log('remove');
};

export { get, save, update, remove };