import { useState } from 'react';
import { Button } from '@mui/material';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return <form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom(user, room);
        }} >
     
            <input placeholder="name" onChange={e => setUser(e.target.value)} />
            <input placeholder="room" onChange={e => setRoom(e.target.value)} />

        <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
    </form>
}

export default Lobby;