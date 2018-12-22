const expect = require('expect');
const {generateMessage , generateLocationMessage} = require('./message');

describe('generateMessage' , () => {
    it('Should have correct message' , () => {
        let from = 'Memo';
        let text = "My Message";
        let message = generateMessage(from ,text);

        expect(message.createdAt).toBeGreaterThan(1);
        expect(message).toMatchObject({from:'Memo',text:"My Message"});
    });
});

describe ('generateLocationMessage' , () => {
    it('Should be a valid url ' , () => {
        let from = 'Rob';
        let latitude = 15;
        let longitude = 20;
        let url = 'https://www.google.com/maps?q=15,20';
        let message = generateLocationMessage(from , latitude ,longitude);

        expect(message.createdAt).toBeGreaterThan(1);
        expect(message).toMatchObject({from:'Rob',url:"https://www.google.com/maps?q=15,20"});
    })
})