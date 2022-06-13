import { useState, Dispatch, SetStateAction } from 'react'

let targetDom: HTMLTextAreaElement

interface IReturn {
    success: boolean,
    copy: (text: string) => void,
    setSuccess: Dispatch<SetStateAction<boolean>>
}
function useCopy(dom: HTMLElement): IReturn;
function useCopy(): IReturn;
function useCopy(arg?: HTMLElement): IReturn {
    const [success, setSuccess] = useState<boolean>(false)
    if (!arg) {
        return {
            success,
            copy: (text: string) => {
                const result = copy(text)
                setSuccess(result)
                return result
            },
            setSuccess
        }
    }
    arg.onclick = function () {
        const copyText = arg.getAttribute('copy-text')
        const result = copy(copyText || '')
        setSuccess(result)
    }
    return {
        success,
        copy,
        setSuccess
    }
}

function copy(text: string) {
    if (!targetDom) {
        targetDom = document.createElement('textarea')
        // @ts-ignore
        targetDom.style = `
            position: fixed;
            top: -1000px;
        `
        document.body.appendChild(targetDom)
    }
    targetDom.setAttribute('readonly', 'readonly')
    targetDom.value = text
    targetDom.select()
    return document.execCommand('Copy')
}

export default useCopy
