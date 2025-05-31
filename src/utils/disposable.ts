const DISIFY_API = "https://www.disify.com/api/email";
import axios from "axios";

export async function isDisposable(email: string): Promise<boolean> {
  try {
    const res = await axios.get(`${DISIFY_API}/${email}`);
    if (res.data.disposable === true) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error calling Disify API:", err);
  }

  return false;
}
