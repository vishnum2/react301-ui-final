import {DateFormatter} from './DateFormatter';

describe('return date in proper format', () => {
    it('should return date in proper format', () => {
        const date = DateFormatter('2019-9-1');
        expect(date).toEqual('2019-09-01');
    });
});