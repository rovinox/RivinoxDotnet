
import { useState } from 'react';
import { Button } from '@mui/material';
const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return <form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
       
            <input type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} value={message} />
       
                <Button variant="primary" type="submit" disabled={!message}>Send</Button>
        
      
    </form>
}

export default SendMessageForm;