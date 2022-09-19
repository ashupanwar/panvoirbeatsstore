import React, { useEffect, useState } from 'react'
import AudioSpectrum from 'react-audio-spectrum'

const AudioVisualizer = () => {


    return (
        <div className='audio-visualizer-div'>
            <AudioSpectrum
                id="audio-canvas"
                height={70}
                width={900}
                audioId={'audio-element'}
                capColor={'red'}
                capHeight={0}
                meterWidth={6}
                meterCount={200}
                meterColor={[
                    { stop: 0, color: 'white' },
                    { stop: 0.5, color: 'white' },
                    { stop: 1, color: 'white' }
                ]}
                gap={6}
            />
        </div>
    )
}

export default AudioVisualizer