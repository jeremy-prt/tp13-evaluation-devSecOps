#!/bin/sh
docker volume ls --filter name=tp13
echo
echo "Mountpoints :"
for vol in tp13_grafana-data tp13_prometheus-data tp13_portainer-data tp13_registry-data; do
  mp=$(docker volume inspect "$vol" --format '{{.Mountpoint}}' 2>/dev/null)
  printf "  %-22s -> %s\n" "$vol" "$mp"
done
