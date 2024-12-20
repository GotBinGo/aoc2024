$latest = Get-ChildItem "*.mjs" | sort LastWriteTime | select -last 1
$latest_filename = $latest.Name 
echo $latest_filename
node $latest_filename