import { ReactElement } from 'react'
import Button from './Button'

function ErrorCard(): ReactElement {
    return (
        <div>
            <h2>Nastala nečekaná chyba...</h2>
            <Button onClick={() => { window.location.href = window.location.protocol + "//" + window.location.host }}>Zkusit znovu</Button>
        </div>
    )
}

export default ErrorCard
