import clipboard from 'clipboard-copy'

export default (context, inject) => {
    inject("copy", clipboard)
}