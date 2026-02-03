export function detectReact(files: string[]): boolean {
  return files.some(
    file =>
      file.endsWith(".jsx") ||
      file.endsWith(".tsx")
  )
}
