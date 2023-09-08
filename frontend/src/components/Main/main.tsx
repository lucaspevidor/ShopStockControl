import React, { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import logo from "../../assets/Logo.svg";
import { api, BackendResponse } from "../../Services/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { Style, Button } from "./styles";

interface MainProps {
    Grid?: BackendResponse, UpdateGrid?: React.Dispatch<React.SetStateAction<BackendResponse | undefined>>
}

const Main = ({ Grid, UpdateGrid }: MainProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loadButtons, setLoadButtons] = useState(false);

    const [fileName, setFileName] = useState("Enviar CSV");    
    const [file, setFile] = useState<File|undefined>(undefined);
    const [validFile, setValidFile] = useState(false);
    const [fileContents, setFileContents] = useState("");
    const [validationOk, setValidationOk] = useState(false);

    const [loadingValidation, setLoadingValidation] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    function ResetStates() {
        setFileName("Enviar CSV");
        setFile(undefined);
        setValidFile(false);
        setFileContents("");
        setValidationOk(false);
        setLoadingValidation(false);
        setLoadingUpdate(false);
        if (UpdateGrid) UpdateGrid(undefined);
    }

    function handleUploadBtnClick() {
        ResetStates();
        fileInputRef.current?.click();
    }

    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const fileUpload = event.target;
        const file = fileUpload.files?.[0];

        if (file) {
            let fileName = file.name;
            if (fileName.length > 10) {
                fileName = fileName.substring(0, 10) + "[...]" + fileName.substring(fileName.length - 4, fileName.length);
            }
            setFileName(fileName); 
            setFile(file);
        }
    }
    
    function handleValidateBtnClick() {
        if (file) {
            const reader = new FileReader();
            reader.onload = handleFileRead;
            reader.onerror = handleFileReadError;
            reader.readAsText(file);

            setLoadingValidation(true);
        }
    }

    function handleFileRead(event: ProgressEvent<FileReader>) {
        const contents = event.target?.result;
        if (contents) {
            setFileContents(contents.toString());  
            ValidateFile(contents.toString());     
        }
    }

    function handleFileReadError(event: ProgressEvent<FileReader>) {
        if (event.target?.error?.message) {
            toast.error(event.target.error.message);
        }
        setLoadingValidation(false);
    }

    async function ValidateFile(contents: string) {
        try {
            const response: AxiosResponse<BackendResponse> = await api.post("/bulkupdate", { rawContent: contents });
            if (response.data.badRequest) {
                toast.error("Alguns erros foram encontrados na validação");
            } else {
                toast.success("Validação concluída com sucesso");
                setValidationOk(true);
            }
            if (UpdateGrid) { UpdateGrid(response.data); }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.data?.error) {
                    toast.error(err.response.data.error);
                }
            }
            if (UpdateGrid) { UpdateGrid(undefined); }
            setValidationOk(false);
        }
        setLoadingValidation(false);
    }

    useEffect(() => {
        if (file) {
            const fileExtension = file.name.substring(file.name.length - 3, file.name.length).toLowerCase();
            if (fileExtension !== "csv") {
                setValidFile(false);
                toast.error("Extensão de arquivo inválida.");
                return;
            } else {                
                setValidFile(true);                
            }
        }
    }, [file]);

    async function UpdatePrices() {
        setLoadingUpdate(true);
        try {
            const response: AxiosResponse = await api.put("/bulkupdate", { rawContent: fileContents });
            if (response.data.message) {
                toast.success(response.data.message);                
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.data?.error) {
                    toast.error(err.response.data.error);
                }
            }
        }
        ResetStates();
        setLoadingUpdate(false);
    }

    useEffect(() => {
        setLoadButtons(true);
    }, []);

    const logoDivClasses = `
        logoDiv
        ${loadButtons ? "fadeIn" : ""}
        ${Grid ? "smaller" : ""}
    `;
    const mainButtonDivClasses = `
        mainButtonDiv 
        ${loadButtons ? "fadeIn" : ""}
    `;

    return (
        <>
            <Style>
                <div className={logoDivClasses}>
                    <img src={logo} alt="App logo" />
                </div>
                <div className={mainButtonDivClasses}>
                    <Button id="uploadBtn" onClick={handleUploadBtnClick}>{fileName}</Button>
                    <div className="subButtonDiv">
                        <Button id="validateBtn" disabled={!validFile || loadingValidation} $faded={!validFile} onClick={() => handleValidateBtnClick()}>
                            {
                                (loadingValidation) ? 
                                    <BeatLoader color={"#FFFFFF"} loading={loadingValidation} size={5} /> : 
                                    "Validar"
                            }
                        </Button>
                        <Button id="updateBtn" disabled={!validationOk || loadingUpdate} $faded={!validationOk} onClick={() => UpdatePrices()}>
                            {
                                (loadingUpdate) ?
                                    <BeatLoader color={"#FFFFFF"} loading={loadingValidation} size={5} /> : 
                                    "Atualizar"
                            }                            
                        </Button>
                    </div>
                </div>
                <input id="file-upload" ref={fileInputRef} type="file" onChange={handleFileUpload} accept=".csv"/>
            </Style>
        </>
    );
};

export default Main;
