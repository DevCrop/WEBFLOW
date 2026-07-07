$ErrorActionPreference = "Stop"

$rawInput = ""
if ($MyInvocation.ExpectingInput) {
  $rawInput = ($input | Out-String)
}
if ([string]::IsNullOrWhiteSpace($rawInput) -and [Console]::IsInputRedirected) {
  $rawInput = [Console]::In.ReadToEnd()
}
if ([string]::IsNullOrWhiteSpace($rawInput)) {
  exit 0
}
$rawInput = $rawInput.Trim().TrimStart([char]0xFEFF)

try {
  $payload = $rawInput | ConvertFrom-Json -ErrorAction Stop
} catch {
  exit 0
}

$toolName = [string]$payload.tool_name
if ($toolName -notmatch '^mcp__webflow') {
  exit 0
}

$inputObject = $payload.tool_input
$mutatingToolName = $toolName -match '(builder|style|variable|component|element|cms|site|asset|custom_code)'
$mutatingActionPattern = '(create|update|set|remove|delete|rename|insert|move|append|prepend|replace|unlink|publish|unpublish|transform|upload|add|assign|apply)'
$readOnlyActionPattern = '^(get|list|read|search|find|describe|inspect|check|audit)'
$isMutation = $false
$actionNames = New-Object System.Collections.Generic.List[string]

if ($null -ne $inputObject -and $inputObject.PSObject.Properties.Name -contains 'actions') {
  foreach ($action in @($inputObject.actions)) {
    $actionName = [string]$action.action
    if (-not [string]::IsNullOrWhiteSpace($actionName)) {
      [void]$actionNames.Add($actionName)
      if ($actionName -match $mutatingActionPattern) {
        $isMutation = $true
      }
    }
  }
} elseif ($mutatingToolName -and $toolName -match '(builder|publish|custom_code)') {
  $isMutation = $true
}

if (-not $isMutation -and $actionNames.Count -gt 0) {
  $allReadOnly = $true
  foreach ($actionName in $actionNames) {
    if ($actionName -notmatch $readOnlyActionPattern) {
      $allReadOnly = $false
    }
  }
  if ($allReadOnly) {
    exit 0
  }
}

if (-not $isMutation) {
  exit 0
}

$message = @"
Webflow MCP mutation detected after $toolName.
Before the final response, update docs/webflow-implementation-status.md for measured state changes. If variables, style selectors, components, variants, page structure, CMS schema/content, or durable rules changed, also update docs/webflow-design-system.md, AGENTS.md, and the draft-only /components catalog where applicable. Do not publish unless the user explicitly approved it.
"@

$output = @{
  hookSpecificOutput = @{
    hookEventName = "PostToolUse"
    additionalContext = $message.Trim()
  }
}

$output | ConvertTo-Json -Depth 5 -Compress
