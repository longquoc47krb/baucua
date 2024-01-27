import React from 'react';
import Odometer from 'react-odometerjs';

const NumberTicker: React.FC = () => {

    return (
        <Odometer
            format="d"
            duration={500}
            value={100000}
        />
    );
};

export default NumberTicker;
