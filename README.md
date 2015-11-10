# BarcodeSeparator

This sample demonstrators the following usage

* Scan or load multiple files
* The files are separated by an image with a barcode on it
* When all files have been scanned, the software detects barcode on all the images. 
* After the above step, the software immediately separate the scanned images by the barcode and upload each file separately

#### See it in Action
You can see how this sample works online <a href="http://www.dynamsoft.com/Samples/DWT/DWT_Upload_BarcodeAsSeparator/_Scan.html" target="_blank">here</a>.

#### Complete Sample
In order to test the sample on your own, you need to download the complete code from [here](http://www.dynamsoft.com/Samples/DWT/DWT_Upload_BarcodeAsSeparator.zip).

### Code snippet
```javascript
DWObject.Addon.Barcode.Read(
	index, 
	document.getElementById("barcodeformat").value,
	function(sImageIndex, result) {
		ProcssedImagesCount++;
		var count = result.GetCount();
		if (count == 0) {
			console.log("No barcode found on image " + sImageIndex);
		} else {
			for (var j = 0; j < count; j++) {
				var barcodeText = result.GetContent(j);
				var imageArray = {
					indexes: sImageIndex,
					text: barcodeText
				}
				imageArrays.push(imageArray);
			}
		}
		if(ProcssedImagesCount == DWObject.HowManyImagesInBuffer) {
			UploadImagesSeparatedByBarcode();
		}
		/*
		* Read the next image
		*/
		ReadBarcode(sImageIndex + 1);
	},
	function(errorCode, errorString) {
		alert(errorString);
	}
);
```

```javascript
/*
* Put a 'barcode' image at the start and the end for processing purpose
*/
if(imageIndexesWithBarcode[0] != 0)
	imageIndexesWithBarcode.splice(0,0,-1);
if(imageIndexesWithBarcode[imageIndexesWithBarcode.length - 1] != DWObject.HowManyImagesInBuffer - 1)
	imageIndexesWithBarcode.push(DWObject.HowManyImagesInBuffer);
var UploadCount = 0;
for (var n = 0; n < imageIndexesWithBarcode.length - 1; n++) {				
	var indice = [];
	var excludeBarcodeFactor = 1;
	if(ExcludeTheImageWithBarcode)
		excludeBarcodeFactor = 0;/*skip the image with barcode*/
	if(n == 0 && imageIndexesWithBarcode[n] == 0 && !ExcludeTheImageWithBarcode) 
	{
		indice.push(0);
	}
	if (n == imageIndexesWithBarcode.length - 2 && imageIndexesWithBarcode[n + 1] == DWObject.HowManyImagesInBuffer && excludeBarcodeFactor == 1) {
		imageIndexesWithBarcode[n + 1] = DWObject.HowManyImagesInBuffer - 1;
	}
	for(var i = imageIndexesWithBarcode[n] + 1; i < imageIndexesWithBarcode[n + 1] + excludeBarcodeFactor; i++){
		indice.push(i);
	}
	DWObject.SelectedImagesCount = indice.length;
	for (var m = 0; m < indice.length; m++) {
		DWObject.SetSelectedImageIndex(m, indice[m]);
	}
	/*
	* Uses milliseconds according to local time as the file name
	*/
	UploadCount++;
	var Digital = new Date();
	var uploadfilename = 'Doc_' + UploadCount + '_RandomNumbe_' + Digital.getMilliseconds() + '.pdf'; 
	DWObject.HTTPPort = location.port == "" ? 80 : location.port;
	DWObject.HTTPUploadThroughPostAsMultiPagePDF(location.hostname, strActionPage, uploadfilename);
	sHttpResponse = DWObject.HTTPPostResponseString;
	if(sHttpResponse.indexOf('DWTBarcodeUploadSuccess') != -1)
	{
		var url = 'http://' + location.hostname + ':' + location.port + CurrentPath + 'ImageScanned/' + sHttpResponse.substr(24);
		UpdateInfo('File Uploaded:', false);
		UpdateInfo("<a href = '" + url + "'target='_blank'>" + sHttpResponse.substr(24) + "</a>", true);
	}
}

```
###Reference
* Core Software used: [Dynamic Web TWAIN and its Barcode Reader Add-on](https://www.dynamsoft.com/CustomerPortal/LoginOrRegister.aspx?status=signup&op=4DD608F3803493E4&product=CB4BDC4FF903450C)
* APIs used in the sample: [Dynamic Web TWAIN APIs] (http://www.dynamsoft.com/help/TWAIN/WebTwain/Addons.htm)
