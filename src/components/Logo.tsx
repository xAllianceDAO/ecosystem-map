import logo from '@/assets/images/multiversx-logo.svg';
import { Image } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function Logo() {
    return (
        <motion.h1 
            className={'text-center text-md-start'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Image src={logo} alt={'MultiversX'} className={'align-baseline'} />
            </motion.div>
            <motion.div 
                className={'position-relative'} 
                style={{ left: '-3px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Ecosystem&nbsp;Map
            </motion.div>
        </motion.h1>
    );
}
