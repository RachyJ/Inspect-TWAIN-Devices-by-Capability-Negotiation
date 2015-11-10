var currentCapType = 0;
EnumDWT_TWAINMSGTYPE = {
    /* Generic messages may be used with any of several DATs.                   */
    MSG_GET: 0x0001, /* Get one or more values                   */
    MSG_GETCURRENT: 0x0002, /* Get current value                        */
    MSG_GETDEFAULT: 0x0003, /* Get default (e.g. power up) value        */
    MSG_GETFIRST: 0x0004, /* Get first of a series of items, e.g. DSs */
    MSG_GETNEXT: 0x0005, /* Iterate through a series of items.       */
    MSG_SET: 0x0006, /* Set one or more values                   */
    MSG_RESET: 0x0007, /* Set current value to default value       */
    MSG_QUERYSUPPORT: 0x0008  /* Get supported operations on the cap.     */
}
EnumDWT_TWAINCONTAINERTYPE = {
    TWON_ARRAY: 3, /* indicates TW_ARRAY container       */
    TWON_ENUMERATION: 4, /* indicates TW_ENUMERATION container */
    TWON_ONEVALUE: 5, /* indicates TW_ONEVALUE container    */
    TWON_RANGE: 6  /* indicates TW_RANGE container       */
}
STR_CapValueType = [
	'TWTY_INT8','TWTY_INT16', 'TWTY_INT32', 'TWTY_UINT8', 'TWTY_UINT16', 'TWTY_int', 'TWTY_BOOL', 
	'TWTY_FIX32', 'TWTY_FRAME', 'TWTY_STR32', 'TWTY_STR64', 'TWTY_STR128', 'TWTY_STR255'];
STR_DuplexValue = ['TWDX_NONE(0)', 'TWDX_1PASSDUPLEX(1)', 'TWDX_2PASSDUPLEX(2)'];

function checkScanner() {
    DWObject.SelectSourceByIndex(document.getElementById('source').selectedIndex);
    DWObject.CloseSource();
    DWObject.OpenSource();
    showCapabilites();
    DWObject.CloseSource();
}
function showCapabilites() {
    DWObject.Capability = EnumDWT_Cap.CAP_SUPPORTEDCAPS;    //CAP_SUPPORTEDCAPS
    DWObject.CapType = EnumDWT_TWAINCONTAINERTYPE.TWON_ARRAY;            //Array
    if (DWObject.CapGet()) {
        var supportedCount = DWObject.CapNumItems;
        UpdateInfo('How Many Capabilities Does it Support?', false); UpdateInfo(supportedCount, true);
        supportedCapabilities.options.length = 0;
        supportedCapabilities.options.add(new Option("Supported Caps", 0));
        for (var i = 0; i < supportedCount; i++) {
            var capHexValue = parseInt(DWObject.GetCapItems(i));
            switch (capHexValue) {
                case 0x8000: supportedCapabilities.options.add(new Option("CAP_CUSTOMBASE", 0x8000)); break;
                case 0x0001: supportedCapabilities.options.add(new Option("CAP_XFERCOUNT", 0x0001)); break;
                case 0x0100: supportedCapabilities.options.add(new Option("ICAP_COMPRESSION", 0x0100)); break;
                case 0x0101: supportedCapabilities.options.add(new Option("ICAP_PIXELTYPE", 0x0101)); break;
                case 0x0102: supportedCapabilities.options.add(new Option("ICAP_UNITS", 0x0102)); break;
                case 0x0103: supportedCapabilities.options.add(new Option("ICAP_XFERMECH", 0x0103)); break;
                case 0x1000: supportedCapabilities.options.add(new Option("CAP_AUTHOR", 0x1000)); break;
                case 0x1001: supportedCapabilities.options.add(new Option("CAP_CAPTION", 0x1001)); break;
                case 0x1002: supportedCapabilities.options.add(new Option("CAP_FEEDERENABLED", 0x1002)); break;
                case 0x1003: supportedCapabilities.options.add(new Option("CAP_FEEDERLOADED", 0x1003)); break;
                case 0x1004: supportedCapabilities.options.add(new Option("CAP_TIMEDATE", 0x1004)); break;
                case 0x1005: supportedCapabilities.options.add(new Option("CAP_SUPPORTEDCAPS", 0x1005)); break;
                case 0x1006: supportedCapabilities.options.add(new Option("CAP_EXTENDEDCAPS", 0x1006)); break;
                case 0x1007: supportedCapabilities.options.add(new Option("CAP_AUTOFEED", 0x1007)); break;
                case 0x1008: supportedCapabilities.options.add(new Option("CAP_CLEARPAGE", 0x1008)); break;
                case 0x1009: supportedCapabilities.options.add(new Option("CAP_FEEDPAGE", 0x1009)); break;
                case 0x100A: supportedCapabilities.options.add(new Option("CAP_REWINDPAGE", 0x100A)); break;
                case 0x100B: supportedCapabilities.options.add(new Option("CAP_INDICATORS", 0x100B)); break;
                case 0x100D: supportedCapabilities.options.add(new Option("CAP_PAPERDETECTABLE", 0x100D)); break;
                case 0x100E: supportedCapabilities.options.add(new Option("CAP_UICONTROLLABLE", 0x100E)); break;
                case 0x100F: supportedCapabilities.options.add(new Option("CAP_DEVICEONLINE", 0x100F)); break;
                case 0x1010: supportedCapabilities.options.add(new Option("CAP_AUTOSCAN", 0x1010)); break;
                case 0x1011: supportedCapabilities.options.add(new Option("CAP_THUMBNAILSENABLED", 0x1011)); break;
                case 0x1012: supportedCapabilities.options.add(new Option("CAP_DUPLEX", 0x1012)); break;
                case 0x1013: supportedCapabilities.options.add(new Option("CAP_DUPLEXENABLED", 0x1013)); break;
                case 0x1014: supportedCapabilities.options.add(new Option("CAP_ENABLEDSUIONLY", 0x1014)); break;
                case 0x1015: supportedCapabilities.options.add(new Option("CAP_CUSTOMDSDATA", 0x1015)); break;
                case 0x1016: supportedCapabilities.options.add(new Option("CAP_ENDORSER", 0x1016)); break;
                case 0x1017: supportedCapabilities.options.add(new Option("CAP_JOBCONTROL", 0x1017)); break;
                case 0x1018: supportedCapabilities.options.add(new Option("CAP_ALARMS", 0x1018)); break;
                case 0x1019: supportedCapabilities.options.add(new Option("CAP_ALARMVOLUME", 0x1019)); break;
                case 0x101A: supportedCapabilities.options.add(new Option("CAP_AUTOMATICCAPTURE", 0x101A)); break;
                case 0x101B: supportedCapabilities.options.add(new Option("CAP_TIMEBEFOREFIRSTCAPTURE", 0x101B)); break;
                case 0x101C: supportedCapabilities.options.add(new Option("CAP_TIMEBETWEENCAPTURES", 0x101C)); break;
                case 0x101D: supportedCapabilities.options.add(new Option("CAP_CLEARBUFFERS", 0x101D)); break;
                case 0x101E: supportedCapabilities.options.add(new Option("CAP_MAXBATCHBUFFERS", 0x101E)); break;
                case 0x101F: supportedCapabilities.options.add(new Option("CAP_DEVICETIMEDATE", 0x101F)); break;
                case 0x1020: supportedCapabilities.options.add(new Option("CAP_POWERSUPPLY", 0x1020)); break;
                case 0x1021: supportedCapabilities.options.add(new Option("CAP_CAMERAPREVIEWUI", 0x1021)); break;
                case 0x1022: supportedCapabilities.options.add(new Option("CAP_DEVICEEVENT", 0x1022)); break;
                case 0x1024: supportedCapabilities.options.add(new Option("CAP_SERIALNUMBER", 0x1024)); break;
                case 0x1026: supportedCapabilities.options.add(new Option("CAP_PRINTER", 0x1026)); break;
                case 0x1027: supportedCapabilities.options.add(new Option("CAP_PRINTERENABLED", 0x1027)); break;
                case 0x1028: supportedCapabilities.options.add(new Option("CAP_PRINTERINDEX", 0x1028)); break;
                case 0x1029: supportedCapabilities.options.add(new Option("CAP_PRINTERMODE", 0x1029)); break;
                case 0x102A: supportedCapabilities.options.add(new Option("CAP_PRINTERSTRING", 0x102A)); break;
                case 0x102B: supportedCapabilities.options.add(new Option("CAP_PRINTERSUFFIX", 0x102B)); break;
                case 0x102C: supportedCapabilities.options.add(new Option("CAP_LANGUAGE", 0x102C)); break;
                case 0x102D: supportedCapabilities.options.add(new Option("CAP_FEEDERALIGNMENT", 0x102D)); break;
                case 0x102E: supportedCapabilities.options.add(new Option("CAP_FEEDERORDER", 0x102E)); break;
                case 0x1030: supportedCapabilities.options.add(new Option("CAP_REACQUIREALLOWED", 0x1030)); break;
                case 0x1032: supportedCapabilities.options.add(new Option("CAP_BATTERYMINUTES", 0x1032)); break;
                case 0x1033: supportedCapabilities.options.add(new Option("CAP_BATTERYPERCENTAGE", 0x1033)); break;
                case 0x1034: supportedCapabilities.options.add(new Option("CAP_CAMERASIDE", 0x1034)); break;
                case 0x1035: supportedCapabilities.options.add(new Option("CAP_SEGMENTED", 0x1035)); break;
                case 0x1036: supportedCapabilities.options.add(new Option("CAP_CAMERAENABLED", 0x1036)); break;
                case 0x1037: supportedCapabilities.options.add(new Option("CAP_CAMERAORDER", 0x1037)); break;
                case 0x1038: supportedCapabilities.options.add(new Option("CAP_MICRENABLED", 0x1038)); break;
                case 0x1039: supportedCapabilities.options.add(new Option("CAP_FEEDERPREP", 0x1039)); break;
                case 0x103A: supportedCapabilities.options.add(new Option("CAP_FEEDERPOCKET", 0x103A)); break;
                case 0x103B: supportedCapabilities.options.add(new Option("CAP_AUTOMATICSENSEMEDIUM", 0x103B)); break;
                case 0x103C: supportedCapabilities.options.add(new Option("CAP_CUSTOMINTERFACEGUID", 0x103C)); break;
                case 0x103D: supportedCapabilities.options.add(new Option("CAP_SUPPORTEDCAPSSEGMENTUNIQUE", 0x103D)); break;
                case 0x103E: supportedCapabilities.options.add(new Option("CAP_SUPPORTEDDATS", 0x103E)); break;
                case 0x103F: supportedCapabilities.options.add(new Option("CAP_DOUBLEFEEDDETECTION", 0x103F)); break;
                case 0x1040: supportedCapabilities.options.add(new Option("CAP_DOUBLEFEEDDETECTIONLENGTH", 0x1040)); break;
                case 0x1041: supportedCapabilities.options.add(new Option("CAP_DOUBLEFEEDDETECTIONSENSITIVITY", 0x1041)); break;
                case 0x1042: supportedCapabilities.options.add(new Option("CAP_DOUBLEFEEDDETECTIONRESPONSE", 0x1042)); break;
                case 0x1043: supportedCapabilities.options.add(new Option("CAP_PAPERHANDLING", 0x1043)); break;
                case 0x1044: supportedCapabilities.options.add(new Option("CAP_INDICATORSMODE", 0x1044)); break;
                case 0x1045: supportedCapabilities.options.add(new Option("CAP_PRINTERVERTICALOFFSET", 0x1045)); break;
                case 0x1046: supportedCapabilities.options.add(new Option("CAP_POWERSAVETIME", 0x1046)); break;
                case 0x1100: supportedCapabilities.options.add(new Option("ICAP_AUTOBRIGHT", 0x1100)); break;
                case 0x1101: supportedCapabilities.options.add(new Option("ICAP_BRIGHTNESS", 0x1101)); break;
                case 0x1103: supportedCapabilities.options.add(new Option("ICAP_CONTRAST", 0x1103)); break;
                case 0x1104: supportedCapabilities.options.add(new Option("ICAP_CUSTHALFTONE", 0x1104)); break;
                case 0x1105: supportedCapabilities.options.add(new Option("ICAP_EXPOSURETIME", 0x1105)); break;
                case 0x1106: supportedCapabilities.options.add(new Option("ICAP_FILTER", 0x1106)); break;
                case 0x1107: supportedCapabilities.options.add(new Option("ICAP_FLASHUSED", 0x1107)); break;
                case 0x1108: supportedCapabilities.options.add(new Option("ICAP_GAMMA", 0x1108)); break;
                case 0x1109: supportedCapabilities.options.add(new Option("ICAP_HALFTONES", 0x1109)); break;
                case 0x110A: supportedCapabilities.options.add(new Option("ICAP_HIGHLIGHT", 0x110A)); break;
                case 0x110C: supportedCapabilities.options.add(new Option("ICAP_IMAGEFILEFORMAT", 0x110C)); break;
                case 0x110D: supportedCapabilities.options.add(new Option("ICAP_LAMPSTATE", 0x110D)); break;
                case 0x110E: supportedCapabilities.options.add(new Option("ICAP_LIGHTSOURCE", 0x110E)); break;
                case 0x1110: supportedCapabilities.options.add(new Option("ICAP_ORIENTATION", 0x1110)); break;
                case 0x1111: supportedCapabilities.options.add(new Option("ICAP_PHYSICALWIDTH", 0x1111)); break;
                case 0x1112: supportedCapabilities.options.add(new Option("ICAP_PHYSICALHEIGHT", 0x1112)); break;
                case 0x1113: supportedCapabilities.options.add(new Option("ICAP_SHADOW", 0x1113)); break;
                case 0x1114: supportedCapabilities.options.add(new Option("ICAP_FRAMES", 0x1114)); break;
                case 0x1116: supportedCapabilities.options.add(new Option("ICAP_XNATIVERESOLUTION", 0x1116)); break;
                case 0x1117: supportedCapabilities.options.add(new Option("ICAP_YNATIVERESOLUTION", 0x1117)); break;
                case 0x1118: supportedCapabilities.options.add(new Option("ICAP_XRESOLUTION", 0x1118)); break;
                case 0x1119: supportedCapabilities.options.add(new Option("ICAP_YRESOLUTION", 0x1119)); break;
                case 0x111A: supportedCapabilities.options.add(new Option("ICAP_MAXFRAMES", 0x111A)); break;
                case 0x111B: supportedCapabilities.options.add(new Option("ICAP_TILES", 0x111B)); break;
                case 0x111C: supportedCapabilities.options.add(new Option("ICAP_BITORDER", 0x111C)); break;
                case 0x111D: supportedCapabilities.options.add(new Option("ICAP_CCITTKFACTOR", 0x111D)); break;
                case 0x111E: supportedCapabilities.options.add(new Option("ICAP_LIGHTPATH", 0x111E)); break;
                case 0x111F: supportedCapabilities.options.add(new Option("ICAP_PIXELFLAVOR", 0x111F)); break;
                case 0x1120: supportedCapabilities.options.add(new Option("ICAP_PLANARCHUNKY", 0x1120)); break;
                case 0x1121: supportedCapabilities.options.add(new Option("ICAP_ROTATION", 0x1121)); break;
                case 0x1122: supportedCapabilities.options.add(new Option("ICAP_SUPPORTEDSIZES", 0x1122)); break;
                case 0x1123: supportedCapabilities.options.add(new Option("ICAP_THRESHOLD", 0x1123)); break;
                case 0x1124: supportedCapabilities.options.add(new Option("ICAP_XSCALING", 0x1124)); break;
                case 0x1125: supportedCapabilities.options.add(new Option("ICAP_YSCALING", 0x1125)); break;
                case 0x1126: supportedCapabilities.options.add(new Option("ICAP_BITORDERCODES", 0x1126)); break;
                case 0x1127: supportedCapabilities.options.add(new Option("ICAP_PIXELFLAVORCODES", 0x1127)); break;
                case 0x1128: supportedCapabilities.options.add(new Option("ICAP_JPEGPIXELTYPE", 0x1128)); break;
                case 0x112A: supportedCapabilities.options.add(new Option("ICAP_TIMEFILL", 0x112A)); break;
                case 0x112B: supportedCapabilities.options.add(new Option("ICAP_BITDEPTH", 0x112B)); break;
                case 0x112C: supportedCapabilities.options.add(new Option("ICAP_BITDEPTHREDUCTION", 0x112C)); break;
                case 0x112D: supportedCapabilities.options.add(new Option("ICAP_UNDEFINEDIMAGESIZE", 0x112D)); break;
                case 0x112E: supportedCapabilities.options.add(new Option("ICAP_IMAGEDATASET", 0x112E)); break;
                case 0x112F: supportedCapabilities.options.add(new Option("ICAP_EXTIMAGEINFO", 0x112F)); break;
                case 0x1130: supportedCapabilities.options.add(new Option("ICAP_MINUMUMHEIGHT", 0x1130)); break;
                case 0x1131: supportedCapabilities.options.add(new Option("ICAP_MINIMUMWIDTH", 0x1131)); break;
                case 0x1134: supportedCapabilities.options.add(new Option("ICAP_AUTODISCARDBLANKPAGES", 0x1134)); break;
                case 0x1136: supportedCapabilities.options.add(new Option("ICAP_FLIPROTATION", 0x1136)); break;
                case 0x1137: supportedCapabilities.options.add(new Option("ICAP_BARCODEDETECTIONENABLED", 0x1137)); break;
                case 0x1138: supportedCapabilities.options.add(new Option("ICAP_SUPPORTEDBARCODETYPES", 0x1138)); break;
                case 0x1139: supportedCapabilities.options.add(new Option("ICAP_BARCODEMAXSEARCHPRIORITIES", 0x1139)); break;
                case 0x113A: supportedCapabilities.options.add(new Option("ICAP_BARCODESEARCHPRIORITIES", 0x113A)); break;
                case 0x113B: supportedCapabilities.options.add(new Option("ICAP_BARCODESEARCHMODE", 0x113B)); break;
                case 0x113C: supportedCapabilities.options.add(new Option("ICAP_BARCODEMAXRETRIES", 0x113C)); break;
                case 0x113D: supportedCapabilities.options.add(new Option("ICAP_BARCODETIMEOUT", 0x113D)); break;
                case 0x113E: supportedCapabilities.options.add(new Option("ICAP_ZOOMFACTOR", 0x113E)); break;
                case 0x113F: supportedCapabilities.options.add(new Option("ICAP_PATCHCODEDETECTIONENABLED", 0x113F)); break;
                case 0x1140: supportedCapabilities.options.add(new Option("ICAP_SUPPORTEDPATCHCODETYPES", 0x1140)); break;
                case 0x1141: supportedCapabilities.options.add(new Option("ICAP_PATCHCODEMAXSEARCHPRIORITIES", 0x1141)); break;
                case 0x1142: supportedCapabilities.options.add(new Option("ICAP_PATCHCODESEARCHPRIORITIES", 0x1142)); break;
                case 0x1143: supportedCapabilities.options.add(new Option("ICAP_PATCHCODESEARCHMODE", 0x1143)); break;
                case 0x1144: supportedCapabilities.options.add(new Option("ICAP_PATCHCODEMAXRETRIES", 0x1144)); break;
                case 0x1145: supportedCapabilities.options.add(new Option("ICAP_PATCHCODETIMEOUT", 0x1145)); break;
                case 0x1146: supportedCapabilities.options.add(new Option("ICAP_FLASHUSED2", 0x1146)); break;
                case 0x1147: supportedCapabilities.options.add(new Option("ICAP_IMAGEFILTER", 0x1147)); break;
                case 0x1148: supportedCapabilities.options.add(new Option("ICAP_NOISEFILTER", 0x1148)); break;
                case 0x1149: supportedCapabilities.options.add(new Option("ICAP_OVERSCAN", 0x1149)); break;
                case 0x1150: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICBORDERDETECTION", 0x1150)); break;
                case 0x1151: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICDESKEW", 0x1151)); break;
                case 0x1152: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICROTATE", 0x1152)); break;
                case 0x1153: supportedCapabilities.options.add(new Option("ICAP_JPEGQUALITY", 0x1153)); break;
                case 0x1154: supportedCapabilities.options.add(new Option("ICAP_FEEDERTYPE", 0x1154)); break;
                case 0x1155: supportedCapabilities.options.add(new Option("ICAP_ICCPROFILE", 0x1155)); break;
                case 0x1156: supportedCapabilities.options.add(new Option("ICAP_AUTOSIZE", 0x1156)); break;
                case 0x1157: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICCROPUSESFRAME", 0x1157)); break;
                case 0x1158: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICLENGTHDETECTION", 0x1158)); break;
                case 0x1159: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICCOLORENABLED", 0x1159)); break;
                case 0x115A: supportedCapabilities.options.add(new Option("ICAP_AUTOMATICCOLORNONCOLORPIXELTYPE", 0x115A)); break;
                case 0x115B: supportedCapabilities.options.add(new Option("ICAP_COLORMANAGEMENTENABLED", 0x115B)); break;
                case 0x115C: supportedCapabilities.options.add(new Option("ICAP_IMAGEMERGE", 0x115C)); break;
                case 0x115D: supportedCapabilities.options.add(new Option("ICAP_IMAGEMERGEHEIGHTTHRESHOLD", 0x115D)); break;
                case 0x115E: supportedCapabilities.options.add(new Option("ICAP_SUPPORTEDEXTIMAGEINFO", 0x115E)); break;
                case 0x115F: supportedCapabilities.options.add(new Option("ICAP_FILMTYPE", 0x115F)); break;
                case 0x1160: supportedCapabilities.options.add(new Option("ICAP_MIRROR", 0x1160)); break;
                case 0x1161: supportedCapabilities.options.add(new Option("ICAP_JPEGSUBSAMPLING", 0x1161)); break;
                case 0x1202: supportedCapabilities.options.add(new Option("ACAP_XFERMECH", 0x1202)); break;
                default: supportedCapabilities.options.add(new Option("Custom CAP :0x:" + capHexValue.toString(16), capHexValue));
            }
        }
    }
}
function getCapType(){
	clearInfo();
	txtReturned.value = DWObject.ErrorString;
	DWObject.OpenSource();
	DWObject.Capability = supportedCapabilities.value;
	DWObject.CapGet();
	var tmpType = DWObject.CapType;
	ctnType.selectedIndex = tmpType - 3;
	document.getElementById('availableValuesSPAN').style.display = 'none';
	switch(tmpType){
		case EnumDWT_TWAINCONTAINERTYPE.TWON_ARRAY/*3*/:
			document.getElementById('availableValuesSPAN').style.display = '';
			document.getElementById('availableValues').options.length = 0;
			for(var i=0;i<DWObject.CapNumItems;i++){
				DWObject.CapValueType>8?
				/*STR*/document.getElementById('availableValues').options.add(new Option(DWObject.GetCapItemsString(i), DWObject.GetCapItemsString(i))):
				/*NUM*/document.getElementById('availableValues').options.add(new Option(DWObject.GetCapItems(i), DWObject.GetCapItems(i)));
			}
			break;
		case EnumDWT_TWAINCONTAINERTYPE.TWON_ENUMERATION/*4*/:
			document.getElementById('availableValuesSPAN').style.display = '';
			document.getElementById('availableValues').options.length = 0;
			for(var i=0;i<DWObject.CapNumItems;i++){
				DWObject.CapValueType>8?
				/*STR*/document.getElementById('availableValues').options.add(new Option(DWObject.GetCapItemsString(i), DWObject.GetCapItemsString(i))):
				/*NUM*/document.getElementById('availableValues').options.add(new Option(DWObject.GetCapItems(i), DWObject.GetCapItems(i)));
			}
			break;
		case EnumDWT_TWAINCONTAINERTYPE.TWON_ONEVALUE/*5*/:
			var tempValue = '';
			tempValue = DWObject.CapValue;
			/*
			* Special for BOOL
			*/
			if(DWObject.CapValueType == EnumDWT_CapValueType.TWTY_BOOL) tempValue ==0?tempValue='FALSE':tempValue='TRUE';
			/*
			* Special for DUPLEX
			*/
			if(supportedCapabilities.value == EnumDWT_Cap.CAP_DUPLEX) tempValue = STR_DuplexValue[tempValue];
			UpdateInfo('ItemType = ' + STR_CapValueType[DWObject.CapValueType],true);
			UpdateInfo('Value = ' + tempValue,true);
			break;
		case EnumDWT_TWAINCONTAINERTYPE.TWON_RANGE/*6*/:
			break;
		default: alert('This Capability is odd, no matching Container');
	}
}
function SelectCap_onChange() {
    var capIndex;
    with (document.all) {
        DWObject.OpenSource();
        DWObject.Capability = supportedCapabilities.value;
        DWObject.CapGet();
        currentCapType = DWObject.CapType;
        if (currentCapType == 3)//TWON_ARRAY
        {
            Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
            Capem = Capem + "Cap Container type is <strong>TWON_ARRAY</strong><br />Available Values are:<br />";
            AvailableValues.options.length = 0;
            for (capIndex = 0; capIndex < DWObject.CapNumItems; capIndex++) {
                if (!Dynamsoft.Env._bInIE)
                    AvailableValues.options.add(new Option(DWObject.GetCapItems(capIndex), DWObject.GetCapItems(capIndex)));
                else
                    AvailableValues.options.add(new Option(DWObject.CapItems(capIndex), DWObject.CapItems(capIndex)));
            }
            appendMessage(Capem);
        }
        if (currentCapType == 4)//TWON_ENUMERATION
        {
            if (supportedCapabilities.value == 0x1114)//ICAP_FRAMES
            {
                AvailableValues.options.length = 0;
                Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
                for (capIndex = 0; capIndex < DWObject.CapNumItems; capIndex++) {
                    Capem = Capem + "Cap Container type is <strong>TWON_ENUMERATION</strong><br />";
                    Capem = Capem + "FrameLeft: " + DWObject.CapGetFrameLeft(capIndex) + "<br />";
                    Capem = Capem + "FrameTop: " + DWObject.CapGetFrameTop(capIndex) + "<br />";
                    Capem = Capem + "FrameRight: " + DWObject.CapGetFrameRight(capIndex) + "<br />";
                    Capem = Capem + "FrameBottom: " + DWObject.CapGetFrameBottom(capIndex) + "<br />";
                }
            }
            else {
                Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
                Capem = Capem + "Cap Container type is <strong>TWON_ENUMERATION</strong><br />";
                if (!Dynamsoft.Env._bInIE) {
                    Capem = Capem + "Current Value : " + DWObject.GetCapItems(DWObject.CapCurrentIndex) + "<br />";
                    Capem = Capem + "Default Value : " + DWObject.GetCapItems(DWObject.CapDefaultIndex) + "<br />";
                }
                else {
                    Capem = Capem + "Current Value : " + DWObject.CapItems(DWObject.CapCurrentIndex) + "<br />";
                    Capem = Capem + "Default Value : " + DWObject.CapItems(DWObject.CapDefaultIndex) + "<br />";
                }
                AvailableValues.options.length = 0;
                for (capIndex = 0; capIndex < DWObject.CapNumItems; capIndex++) {
                    if (!Dynamsoft.Env._bInIE)
                        AvailableValues.options.add(new Option(DWObject.GetCapItems(capIndex), DWObject.GetCapItems(capIndex)));
                    else
                        AvailableValues.options.add(new Option(DWObject.CapItems(capIndex), DWObject.CapItems(capIndex)));
                }
            }
            appendMessage(Capem);
        }
        if (currentCapType == 5)//TWON_ONEVALUE
        {
            if (supportedCapabilities.value == 0x1114)//ICAP_FRAMES
            {
                AvailableValues.options.length = 0;
                Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
                Capem = Capem + "Cap Container type is <strong>TWON_ONEVALUE</strong><br />";
                Capem = Capem + "FrameLeft: " + DWObject.CapGetFrameLeft(0) + "<br />";
                Capem = Capem + "FrameTop: " + DWObject.CapGetFrameTop(0) + "<br />";
                Capem = Capem + "FrameRight: " + DWObject.CapGetFrameRight(0) + "<br />";
                Capem = Capem + "FrameBottom: " + DWObject.CapGetFrameBottom(0) + "<br />";
            }
            else {
                AvailableValues.options.length = 0;
                Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
                Capem = Capem + "Cap Container type is <strong>TWON_ONEVALUE</strong><br />";
                Capem = Capem + "Current Value : " + DWObject.CapValue + "<br />";
                for (capIndex = 0; capIndex < DWObject.CapNumItems; capIndex++) {
                    if (!Dynamsoft.Env._bInIE)
                        Capem = Capem + "Available Values [" + capIndex + "]:" + DWObject.GetCapItems(capIndex) + "<br />";
                    else
                        Capem = Capem + "Available Values [" + capIndex + "]:" + DWObject.CapItems(capIndex) + "<br />";
                }
            }
            appendMessage(Capem);
        }
        if (currentCapType == 6)//TWON_RANGE
        {
            AvailableValues.options.length = 0;
            Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
            Capem = Capem + "Cap Container type is <strong>TWON_RANGE</strong><br />";
            Capem = Capem + "Current Value : " + DWObject.CapCurrentValue + "<br />";
            Capem = Capem + "Default Value : " + DWObject.CapDefaultValue + "<br />";
            Capem = Capem + "Min Value : " + DWObject.CapMinValue + "<br />";
            Capem = Capem + "Max Value : " + DWObject.CapMaxValue + "<br />";
            Capem = Capem + "Step Size : " + DWObject.CapStepSize + "<br />";
            appendMessage(Capem);
        }
    }
}
function btnSetCap() {
    var capIndex;
    with (document.all) {
        DWObject.OpenSource();
        DWObject.Capability = supportedCapabilities.value;
        DWObject.CapGet();
        currentCapType = DWObject.CapType;
        if (currentCapType == 3)//TWON_ARRAY
        {
            Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
            Capem = Capem + "Cap Container type is <strong>TWON_ARRAY</strong><br />Available Values are:<br />";
            AvailableValues.options.length = 0;
            for (capIndex = 0; capIndex < DWObject.CapNumItems; capIndex++) {
                if (!Dynamsoft.Env._bInIE)
                    AvailableValues.options.add(new Option(DWObject.GetCapItems(capIndex), DWObject.GetCapItems(capIndex)));
                else
                    AvailableValues.options.add(new Option(DWObject.CapItems(capIndex), DWObject.CapItems(capIndex)));
            }
            Capmessage.value = Capem;
        }
        if (currentCapType == 4)//TWON_ENUMERATION
        {
            Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
            DWObject.CapCurrentIndex = AvailableValues.selectedIndex;

            Capem = Capem + "Cap Container type is <strong>TWON_ENUMERATION</strong><br />";
            if (DWObject.CapSet()) {
                Capem = Capem + "Capability was set successfully! " + "<br />";
                Capem = Capem + "Current Value : " + DWObject.GetCapItems(DWObject.CapCurrentIndex) + "<br />";
                Capem = Capem + "Default Value : " + DWObject.GetCapItems(DWObject.CapDefaultIndex) + "<br />";
            }
            else {
                Capem = Capem + "Capability was not set! " + DWObject.CapCurrentIndex + "<br />";
            }
            Capmessage.value = Capem;
        }
        if (currentCapType == 5)//TWON_ONEVALUE
        {
            Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
            if (document.getElementById("valueToSet").value != 0) {
                DWObject.CapValue = document.getElementById("valueToSet").value;
            }
            if (DWObject.CapSet()) {
                Capem = Capem + "Capability was set successfully! " + "<br />";
                if (DWObject.CapGet()) {
                    Capem = Capem + "Current Value : " + DWObject.CapValue + "<br />";
                }
            }
            Capmessage.value = Capem;
        }
        if (currentCapType == 6)//TWON_RANGE
        {
            AvailableValues.options.length = 0;
            Capem = "--------------------------------------------------------<br /><span style='color:red;  font-weight:bold'>Capability Negotiation</span> --" + supportedCapabilities.selectedOptions[0].text + " <br />";
            Capem = Capem + "Cap Container type is <strong>TWON_RANGE</strong><br />";
            Capem = Capem + "Current Value : " + DWObject.CapCurrentValue + "<br />";
            Capem = Capem + "Default Value : " + DWObject.CapDefaultValue + "<br />";
            Capem = Capem + "Min Value : " + DWObject.CapMinValue + "<br />";
            Capem = Capem + "Max Value : " + DWObject.CapMaxValue + "<br />";
            Capem = Capem + "Step Size : " + DWObject.CapStepSize + "<br />";
            appendMessage(Capem);
        }
    }
}
function btnScanEx() {
    DWObject.IfShowUI = false;
    DWObject.AcquireImage();
}