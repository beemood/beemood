

### 1. Disable VS Code Built-in Ghost Text / Autocomplete

To turn off the built-in inline completion provider entirely:

```json
{
  "editor.inlineSuggest.enabled": false
}

```

---

### 2. Disable Specific AI Extensions

If you want to keep general editor suggestions active but turn off specific AI extensions:

* **GitHub Copilot:**
```json
{
  "github.copilot.inlineSuggest.enable": false
}

```


* **Codeium:**
```json
{
  "codeium.enableCodeCompletion": false
}

```


* **Tabnine:**
```json
{
  "tabnine.experimentalAutoImports": false,
  "editor.inlineSuggest.enabled": false
}

```


* **AWS CodeWhisperer / Amazon Q:**
```json
{
  "amazonQ.inlineSuggestions.enable": false
}

```



---

### 3. Quick UI Method

1. Open settings via `Ctrl+,` (Linux/Windows) or `Cmd+,` (macOS).
2. Search for **"Inline Suggest Enabled"**.
3. Uncheck **Editor > Inline Suggest: Enabled**.


