import React, { ReactElement } from 'react'
import { Switch as HSwitch } from '@headlessui/react'

interface Props {
    checked: boolean,
    onChange: (value: boolean) => void,
    label: string,

}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Switch({ checked, onChange, label }: Props): ReactElement {
    return (
        <HSwitch
            checked={checked}
            onChange={onChange}
            className={classNames(
                checked ? 'bg-primary-500' : 'bg-gray-200',
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
            )}
        >
            <span className="sr-only">{label}</span>
            <span
                aria-hidden="true"
                className={classNames(
                    checked ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                )}
            />
        </HSwitch>
    )
}

export default Switch
