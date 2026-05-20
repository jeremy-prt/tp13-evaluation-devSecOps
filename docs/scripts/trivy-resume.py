import json
import sys

d = json.load(sys.stdin)

crit = sum(
    1
    for r in d.get('Results', [])
    for v in (r.get('Vulnerabilities') or [])
    if v.get('Severity') == 'CRITICAL'
)

high = sum(
    1
    for r in d.get('Results', [])
    for v in (r.get('Vulnerabilities') or [])
    if v.get('Severity') == 'HIGH'
)

nom = d['ArtifactName']
os_info = d['Metadata']['OS']

print(f"Image    : {nom}")
print(f"OS       : {os_info['Family']} {os_info['Name']}")
print()
print(f"  CRITICAL : {crit}")
print(f"  HIGH     : {high}")
