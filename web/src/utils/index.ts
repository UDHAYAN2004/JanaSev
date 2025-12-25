export const AUTH_APP_USER:string="AUTH_APP_USER";


export const toErrorMsg = (err: any): string => {
        if (!err) return "Something went wrong";

        if (err.data) err = err.data;

        if (typeof err.message === "string") return err.message;

        if (Array.isArray(err.errors)) {
          return err.errors
            .map((e: any) => e.message || e)
            .join(", ");
        }

        if (err.errors && typeof err.errors === "object") {
          const first = Object.values(err.errors)[0];
          return typeof first === "string"
            ? first
            : JSON.stringify(first);
        }

        return typeof err === "string"
          ? err
          : JSON.stringify(err);
      };