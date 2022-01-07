import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const _isNumber = (value) => {
    return !!(!Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value));
};

export const isUnixTimestamp = (value) => {
    if (value && _isNumber(value)) {
        value = value.toString();
        return /^\d{8,11}$/.test(value);
    } else {
        return false;
    }
};
/**
 * Get the time manipulation library w locale
 */
export const timeUtil = (time) => {
    if (time && isUnixTimestamp(time)) {
        time = Number.parseFloat(time.toString());
        return dayjs.unix(time);
    } else {
        return dayjs(time);
    }
};
/**
 * Get the time since a date in human language
 * @param time - time/date
 */
export const timeAgo = (time) => {
    if (!time) return '';
    return timeUtil(time).fromNow();
};

/**
 * Gets a standard formatted date
 * @param time - moment/dayjs compatible date
 */
export const standardDate = (time) => {
    if (!time) return '';
    return timeUtil(time).format('MMM DD, YYYY');
};
/**
 * Gets a standard formatted time
 * @param time - moment/dayjs compatible date
 */
export const standardTime = (time) => {
    return timeUtil(time).format('h:mma (MM/D)');
};
/**
 * Get date in international format "YYYY-M-DD"
 */
export const internationalDate = (time) => {
    return timeUtil(time).format('YYYY-M-DD');
};
/**
 * Get date with year/month "YYYY-MM"
 */
export const internationalMonth = (time) => {
    return timeUtil(time).format('YYYY-MM');
};
/**
 * Convert a date-like object to a JS Date
 */
export const toDate = (time) => {
    return timeUtil(time).toDate();
};
/**
 * Gets the timestamp associated with a date-like object
 */
export const timestamp = (time) => {
    return !time ? timeUtil().unix() : timeUtil(time).unix();
};
