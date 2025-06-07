
const cache = {
    data: null,
    timestamp: 0,
};


function getCache(userId, key) {
    if (!cache.data) {
        return false;
    }


    if (key === 'owner') {
        return cache.data.owner;
    }

    if (key === 'users') {
        return cache.data.users.includes(userId);
    }

    if (key === 'fraude') {
        return cache.data.bloqueado;
    }

    if (key === 'additional') {
        return cache.data.additional;
    }

    return false;
}


module.exports = {
    getCache
};
