import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';

const PeerComponent = ({ id, onData, onCall }) => {
   const peer = useRef(null);

   useEffect(() => {
      peer.current = new Peer(id, {
         host: 'localhost',
         port: 5000,
         path: '/peerjs',
      });

      peer.current.on('open', () => {
         console.log(`Connected with ID: ${peer.current.id}`);
      });

      peer.current.on('connection', (conn) => {
         console.log('Data connection established');
         conn.on('data', onData);
      });

      peer.current.on('call', (call) => {
         console.log('Incoming call');
         onCall(call);
      });

      return () => {
         peer.current.destroy();
      };
   }, [id, onData, onCall]);

   return null;
};

export default PeerComponent;
