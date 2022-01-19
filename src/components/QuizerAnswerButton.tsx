import React, { ReactElement } from 'react'

interface Props {
    children: React.ReactNode;
    onClick: () => void
}

function QuizerAnswerButton(props: Props): ReactElement {
    return (
        <div className="pt-0 pb-1 group w-full">
            <button className="w-full px-8 py-4 text-gray-900 font-extrabold bg-white border-2 border-gray-900 rounded-lg transition duration-150 ease-in-out drop-shadow-[0_4px_0_rgba(17,24,39,1)] hover:scale-110 focus:outline-none " {...props} >
                {props.children}
            </button>
        </div>
    )
}

export default QuizerAnswerButton
