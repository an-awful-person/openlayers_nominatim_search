import { API_METHOD } from "../../constants/api.constants";
import type { AuthApiResponse } from "../user.model";

/**
 * ApiOptions interface
 * @param formData - FormData object
 * @param method - HTTP method
 * @param contentType - Content type
 * @param progressBar - Show/hide progress bar (default show)
 * @param errorMessage - Show/hide error message (default show)
 * @param authorizationCall - Is it an authorization call (default false)
 * @param jwtToken - JWT token
 */
export type ApiOptions = {
    formData?: any;
    method?: API_METHOD;
    contentType?: string;
    progressBar?: boolean;
    errorMessage?: boolean;
    authorizationCall?: boolean;
    jwtToken?: AuthApiResponse;
}
