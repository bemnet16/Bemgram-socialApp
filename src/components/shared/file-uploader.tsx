import  { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl}: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);


  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className=" flex flex-col items-center justify-center h-30 p-4 bg-[#131315] rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#7878A3] text-sm"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="h-44 flex items-center justify-center font-semibold">
          Drop the file here ...
        </p>
      ) : fileUrl ? (
        <div className="flex flex-col flex-1 items-center justify-center w-full cursor-pointer">
          <img
            src={fileUrl}
            className="h-80 lg:h-[480px] w-full rounded-[18px] object-cover object-top"
            alt="post img"
          />
          <p className="text-gray-500 mt-3">
            Click or drag another photo to replace!
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file upload"
            width={96}
            height={77}
          />
          <h3 className=" font-semibold mt-3 p-1">Drag and drop photo here.</h3>
          <p className="text-slate-700">SVG PNG JPG</p>

          <p className=" mt-5 bg-[#1d1d1f] rounded-md px-16 pt-2 pb-3 cursor-pointer hover:bg-[#232325]">
            Select from file
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
