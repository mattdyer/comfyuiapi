# ComfyUI API Script Usage

This script allows you to trigger ComfyUI workflows via the API and override specific parameters like prompt, width, and height using command-line arguments.

## Prerequisites
- A running ComfyUI server at `127.0.0.1:8188` (or configured via `--server`).
- The `websocket-client` Python package installed in your virtual environment.
- The workflow JSON file (e.g., `image_qwen_Image_2512.json`) present in the directory.

## Execution
Always ensure your Python virtual environment is activated before running the script:
```bash
source bin/activate
```

## Command Line Arguments
| Argument | Description | Example |
| :--- | :--- | :--- |
| `--prompt` | Overrides the `text` input in the workflow nodes. | `--prompt "a red car"` |
| `--width` | Overrides the `width` input in the latent image nodes. | `--width 1024` |
| `--height` | Overrides the `height` input in the latent image nodes. | `--height 1024` |
| `--json` | Path to your exported ComfyUI API JSON file. | `--json my_workflow.json` |
| `--server` | The address of your ComfyUI server. | `--server 127.0.0.1:8188` |

## Example Command
To generate an image of a "golden dragon" at 1280x1280 resolution:
```bash
python3 comfyui_api_example.py --prompt "a golden dragon" --width 1280 --height 1280
```
