const pdfkit = require('pdfkit');
const blobStream = require('blob-stream');

const doc =new pdfkit

doc.text("hello world", 25, 25)

const stream = doc.pipe(blobStream())

doc.end()

stream.on('finish', function () {
    const url = stream.toBlobURL('application/pdf')
    const element = document.getElementById('pdf')
    element.setAttribute('href', url)
    element.style.display = 'block'
})