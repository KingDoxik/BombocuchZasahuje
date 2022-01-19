import { ReactElement } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onClick: () => void
};

function Button(props: ButtonProps): ReactElement {
    return (
        <div className="pt-0 pb-1 group">
            <button className="px-8 py-4 flex text-primary-900 font-extrabold bg-primary-500 rounded-lg transition duration-150 ease-in-out drop-shadow-[0_4px_0_rgba(39,119,192,1)] hover:scale-110 focus:drop-shadow-[0_0px_0_rgba(39,119,192,1)] focus:translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" {...props} >
                {props.children}
            </button>
        </div>
    )
}

export default Button
