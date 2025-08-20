import React, { useEffect, useState } from "react";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import XHRUpload from "@uppy/xhr-upload";
import Webcam from "@uppy/webcam";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/image-editor/dist/style.css";

export default function FileUploader() {
    const [uppy] = useState(() => {
        const uppyInstance = new Uppy({
            id: "file-uploader",
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: [".jpg", ".png", ".jpeg"],
            },
            autoProceed: false,
        });

        uppyInstance.use(ImageEditor, {
            cropperOptions: {
                aspectRatio: 1,
                viewMode: 1,
            },
            actions: {
                revert: true,
                rotate: true,
                granularRotate: true,
                flip: true,
                zoomIn: true,
                zoomOut: true,
                cropSquare: true,
                cropWidescreen: true,
                cropWidescreenVertical: true,
            },
        });

        uppyInstance.use(XHRUpload, {
            endpoint: "http://localhost:8080/api/users/${userId}/profile-pic",
            fieldName: "profilePic",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}`},
        });

        uppyInstance.use(Webcam);

        return uppyInstance;
    });

    useEffect(() => {
        const successHandler = (file, response) => {
            console.log("File uploaded successfully: ", file.name);
            console.log("Server response: ", response);
        };

        const errorHandler = (file, error) => {
            console.error("Error uploading file: ", file.name);
            console.error("Error: ", error);
        };

        const completeHandler = (result) => {
            console.log("Upload complete. Files: ", result.successful);
        };

        uppy.on("upload-success", successHandler);
        uppy.on("upload-error", errorHandler);
        uppy.on("complete", completeHandler);

        return () => {
            uppy.off("upload-success", successHandler);
            uppy.off("upload-error", errorHandler);
            uppy.off("complete", completeHandler);
        };
    }, [uppy]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Upload Your Files</h2>
            <Dashboard
                uppy={uppy}
                height={450}
                showProgressDetails
                note="Valid filetypes: jpg, gif, or png. Maximum size per photo: 10MB"
                proudlyDisplayPoweredByUppy={false}
                showLinkToFileUploadResult={false}
                showRemoveButtonAfterComplete={false}
            />
        </div>
    );
}