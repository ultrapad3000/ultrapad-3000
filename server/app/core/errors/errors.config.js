module.exports = {
    notebookNotFound: {
        type: 'notebookNotFound',
        status: 404,
        message: 'Notebook not found.'
    },
    noteNotFound: {
        type: 'noteNotFound',
        status: 404,
        message: 'Note not found'
    },
    unknown: {
        type: 'unknown',
        status: 500,
        message: 'An unknown error happened'
    }
}
