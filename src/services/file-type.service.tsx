import { FileTypeEnum } from "model/file-type.enum";
import React, { ReactElement } from "react";

export const getFileTypeIcon = (fileType: FileTypeEnum): ReactElement => {
    switch (fileType) {
        case FileTypeEnum.TEXT:
            return <i className="far fa-file-alt txt"/>;
        case FileTypeEnum.IMAGE:
            return <i className="far fa-image img"/>;
        case FileTypeEnum.PDF:
            return <i className="far fa-file-pdf pdf"/>;
        case FileTypeEnum.VIDEO:
            return <i className="fas fa-video video"/>;
    }
}
