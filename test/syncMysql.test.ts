import friendApply from '../src/models/friendApply';
import friends from '../src/models/friends';
import user from '../src/models/user';

describe('sync friends', () => {
    // beforeAll(async () => {
    //     friends.sync({ force: true })
        
    // })
    it('sync friendApply', async () => {
        //await friendApply.sync({ force: true })
        expect(true).toBeDefined() 
    })

    it('sync user', async () => {
       // await user.sync({ force: true })
        expect(true).toBeDefined() 
    })

    it('sync friends', async () => {
       // await friends.sync({ force: true })
        expect(true).toBeDefined() 
    })
})
