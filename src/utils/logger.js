export const logType = {
    event: { color: '#5233ff' },
    info: { color: '#00ABFF' },
    record: { color: '#FF9500' },
    data: { color: '#FF9500' },
    command: { color: '#FF9500' },
    send: { color: '#00BD0C' },
    error: { color: '#FF0076' },
    warn: { color: '#FF0076' },
    notify: { color: '#FF9500' },
    success: { color: '#00BD0C' },
};

/**
 * Log only in development mode
 * @reference https://itnext.io/console-rules-b30560fc2367
 */
export const dLog = (category, description, data) => {
    const shouldLog =
        process.env.NODE_ENV == 'development' || (typeof localStorage !== 'undefined' && localStorage.getItem('dLog'))
            ? true
            : false;

    if (shouldLog) {
        const color = logType[category].color;
        const additional = '';

        // eslint-disable-next-line no-console
        console.log(
            `%c${category} > ${description}`,
            `font-weight:bold;color: ${color};padding: 5px 0;${additional}`,
            data ?? '',
        );
    }
};
