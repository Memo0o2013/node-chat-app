const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage' , () => {
    it('Should have correct message' , () => {
        let from = 'Memo';
        let text = "My Message";
        let message = generateMessage(from ,text);

        expect(message.createdAt).toBeGreaterThan(1);
        expect(message).toMatchObject({from:'Memo',text:"My Message"});
    })
})