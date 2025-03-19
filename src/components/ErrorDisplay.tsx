import { ApiReplyError } from "@/lib/api-routes";
import { memo } from "react";

export const ErrorDisplay = memo(
  ({
    error,
    map = {},
    fallbackText = "An error occured"
  }: {
    error: any;
    map?: Record<string, string>;
    fallbackText?: string;
  }) => {
    if (!error) return null;

    let errorCode = ApiReplyError.getCode(error);
    let errorText = fallbackText;
    for (const code in map) {
      if (code === errorCode) {
        errorText = map[code];
        break;
      }
    }

    return (
      <>
        {errorText && <p className='text-sm text-destructive'>{errorText}</p>}
      </>
    );
  }
);
