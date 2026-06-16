---
name: image-generation
description: USE FOR generating images and giving images a transparent background. This must be done in 2 steps.
---

# Image Generation



## Execution
Always ensure your Python virtual environment is activated before running the script:
```bash
source bin/activate
```

Run to generate image
```bash
python comfyui_api_example.py --prompt [YOUR PROMPT]
```

Image will be created in current directory. The name is part of the script output.

The image needs to be created and then moved to where it is needed

## Command Line Arguments
| Argument | Description | Example |
| :--- | :--- | :--- |
| `--prompt` | Overrides the `text` input in the workflow nodes. | `--prompt "a red car"` |
| `--width` | Overrides the `width` input in the latent image nodes. | `--width 1024` |
| `--height` | Overrides the `height` input in the latent image nodes. | `--height 1024` |
| `--json` | Path to your exported ComfyUI API JSON file. | `--json my_workflow.json` |
| `--server` | The address of your ComfyUI server. | `--server 127.0.0.1:8188` |

Example with other arguments
```bash
python compyui_api_example.py --prompt "a man standing in a field" --width 512 -- height 512
```


# Transparent Background

## Command Line Arguments
| Argument | Description | Example |
| :--- | :--- | :--- |
| `image_path` | Path to the input image to process. | `input_image.png` |
| `--json` | Path to the Birefnet workflow JSON. | `--json utility_birefnet_remove_background.json` |
| `--server` | The address of your ComfyUI server. | `--server 127.0.0.1:8188` |

## Example Command
To remove the background from an image:
```bash
python comfyui_birefnet_remove_bg.py path/to/your/image.png
```

Image will be created in current directory. The name is part of the script output

The image needs to be created and then moved to where it is needed

