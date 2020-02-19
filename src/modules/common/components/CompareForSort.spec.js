import {comparePointsAsc, compareCountAsc, compareCountDesc, comparePointsDesc, compareValidityAsc, compareValidityDesc} from './CompareForSort';

describe('check positive case for comparePointsAsc', () => {
    it('should return 1', () => {
        const arg1 = {
            cardPoints: 3
        };
        const arg2 = {
            cardPoints: 2
        }
        const returnedvalue = comparePointsAsc(arg1,arg2);
        expect(returnedvalue).toEqual(1);
    });
});

describe('check negative case for comparePointsAsc', () => {
    it('should return -1', () => {
        const arg1 = {
            cardPoints: 2
        };
        const arg2 = {
            cardPoints: 3
        }
        const returnedvalue = comparePointsAsc(arg1,arg2);
        expect(returnedvalue).toEqual(-1);
    });
});

describe('check positive case for comparePointsDesc', () => {
    it('should return 1', () => {
        const arg1 = {
            cardPoints: 2
        };
        const arg2 = {
            cardPoints: 3
        }
        const returnedvalue = comparePointsDesc(arg1,arg2);
        expect(returnedvalue).toEqual(1);
    });
});

describe('check negative case for comparePointsDesc', () => {
    it('should return -1', () => {
        const arg1 = {
            cardPoints: 3
        };
        const arg2 = {
            cardPoints: 2
        }
        const returnedvalue = comparePointsDesc(arg1,arg2);
        expect(returnedvalue).toEqual(-1);
    });
});

describe('check positive case for compareCountAsc', () => {
    it('should return 1', () => {
        const arg1 = {
            cardCount: 3
        };
        const arg2 = {
            cardCount: 2
        }
        const returnedvalue = compareCountAsc(arg1,arg2);
        expect(returnedvalue).toEqual(1);
    });
});

describe('check negative case for compareCountAsc', () => {
    it('should return -1', () => {
        const arg1 = {
            cardCount: 2
        };
        const arg2 = {
            cardCount: 3
        }
        const returnedvalue = compareCountAsc(arg1,arg2);
        expect(returnedvalue).toEqual(-1);
    });
});

describe('check positive case for compareCountDesc', () => {
    it('should return 1', () => {
        const arg1 = {
            cardCount: 2
        };
        const arg2 = {
            cardCount: 3
        }
        const returnedvalue = compareCountDesc(arg1,arg2);
        expect(returnedvalue).toEqual(1);
    });
});

describe('check negative case for compareCountDesc', () => {
    it('should return -1', () => {
        const arg1 = {
            cardCount: 3
        };
        const arg2 = {
            cardCount: 2
        }
        const returnedvalue = compareCountDesc(arg1,arg2);
        expect(returnedvalue).toEqual(-1);
    });
});

describe('check positive case for compareValidityAsc', () => {
    it('should return 1', () => {
        const arg1 = {
            cardExpiryDate: 3
        };
        const arg2 = {
            cardExpiryDate: 2
        }
        const returnedvalue = compareValidityAsc(arg1,arg2);
        expect(returnedvalue).toEqual(1);
    });
});

describe('check negative case for compareValidityAsc', () => {
    it('should return -1', () => {
        const arg1 = {
            cardExpiryDate: 2
        };
        const arg2 = {
            cardExpiryDate: 3
        }
        const returnedvalue = compareValidityAsc(arg1,arg2);
        expect(returnedvalue).toEqual(-1);
    });
});

describe('check positive case for compareValidityDesc', () => {
    it('should return 1', () => {
        const arg1 = {
            cardExpiryDate: 2
        };
        const arg2 = {
            cardExpiryDate: 3
        }
        const returnedvalue = compareValidityDesc(arg1,arg2);
        expect(returnedvalue).toEqual(1);
    });
});

describe('check negative case for compareValidityDesc', () => {
    it('should return -1', () => {
        const arg1 = {
            cardExpiryDate: 3
        };
        const arg2 = {
            cardExpiryDate: 2
        }
        const returnedvalue = compareValidityDesc(arg1,arg2);
        expect(returnedvalue).toEqual(-1);
    });
});