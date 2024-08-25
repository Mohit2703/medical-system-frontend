import { useEffect, useRef, useState } from "react";
import "./QrStyles.css";
import QrScanner from "qr-scanner";
import QrFrame from "./qr-frame.svg";
import { APICall } from "../api/api";

const QrReader = ({setProduct, product, qrData, setQrData}) => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanSuccess = (result) => {
    console.log(result);
    const url_qr_medicine = `medicines/get_medicine_qr/${result?.data}/`;
    APICall("GET", {}, url_qr_medicine, true).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setProduct(res.data.data);
      } else {
        alert("Medicine not found");
      }
    });
    setQrData(result?.data);
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame.src}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default QrReader;