import { h, ref, computed } from 'vue'
import { GeoJSON } from 'ol/format'
import { Map, MapControls, Layers, Sources, Interactions, Styles } from "vue3-openlayers";
import { QBtn } from 'quasar';

export default {
    name: 'QAMap',
    props: {
        modelValue: [Object, Array],
        options: Array,
        multiple: Boolean,
        geometryType: {
            type: String,
            default: 'Point'
        },
        mapHeight: {
            type: String,
            default: '400px'
        },
        mapWidth: String,
        readonly: Boolean,
        disable: Boolean,
        hint: String,
        showSelect: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:modelValue', 'new-value'],

    setup(props, { emit }) {

        const editable = computed(() =>
            props.readonly !== true && props.disable !== true
        )

        function setValue(value) {
            if (editable.value === true) {
                emit('update:modelValue', value)
            }
        }

        const projection = ref('EPSG:4326')//EPSG:3857')
        const view = ref(null)
        const zones = ref([])
        const location = ref(null)

        // set zones from model
        if (props.modelValue) {
            if (props.multiple) {
                zones.value = props.modelValue.map(value => new GeoJSON().readFeature(value))
            } else {
                zones.value.push(new GeoJSON().readFeature(props.modelValue))
            }
        }

        const applyLocation = (loc) => {
            view.value.fit([loc[0], loc[1], loc[0], loc[1]], {
                maxZoom: 14
            })
        }

        const geoLocationChanged = (loc) => {
            if (location.value === null) {
                applyLocation(loc)
            }
            location.value = loc
        }

        const clearZones = () => {
            zones.value = []
            setValue(null)
        }

        const toCurrentPosition = () => {
            if (location.value !== null) {
                applyLocation(location.value)
            }
        }

        const drawend = (event) => {
            if (editable.value === true) {
                if (!props.multiple) {
                    zones.value = []
                }
                zones.value.push(event.feature)
                setValue(props.multiple ?
                    zones.value.map(zone => JSON.parse(new GeoJSON().writeFeature(zone))) :
                    zones.value.length > 0 ? JSON.parse(new GeoJSON().writeFeature(zones.value[0])) : null)
            }
        }

        return () => {

            const controlsComponents = h('div', {
                class: 'bg-grey-3 q-mb-sm',
            }, [
                h(QBtn, {
                    icon: 'delete_outline',
                    flat: true,
                    size: 'sm',
                    onClick: clearZones
                }),
                h(QBtn, {
                    icon: 'adjust',
                    flat: true,
                    size: 'sm',
                    onClick: toCurrentPosition
                })
            ])

            const mapComponents = h(Map.Map, {
                class: 'q-mt-sm',
                loadTilesWhileAnimating: true,
                loadTilesWhileInteracting: true,
                style: 'height: ' + props.mapHeight
            }, {
                default: () => [
                    h(Map.View, {
                        ref: view,
                        projection: projection.value
                    }),
                    h(MapControls.FullScreenControl),
                    //h(MapControls.MousePositionControl),
                    h(MapControls.ZoomControl),
                    h(MapControls.AttributionControl),
                    h(Layers.TileLayer, null, {
                        default: () => [h(Sources.SourceOSM)]
                    }),
                    h(Layers.VectorLayer, null, {
                        default: () => [
                            h(Sources.SourceVector, {
                                projection: projection.value,
                                features: zones.value
                            }, {
                                default: () => [
                                    h(Interactions.DrawInteraction, {
                                        type: props.geometryType,
                                        onDrawend: drawend
                                    })
                                ]
                            }),
                            h(Styles.Style, null, {
                                default: () => [
                                    h(Styles.Stroke, {
                                        color: 'red',
                                        width: 2
                                    }),
                                    h(Styles.Fill, {
                                        color: 'rgba(255,255,255,0.1)'
                                    }),
                                    h(Styles.Circle, {
                                        radius: 7
                                    }, {
                                        default: () => [
                                            h(Styles.Fill, {
                                                color: 'blue'
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    h(Map.GeoLocation, {
                        projection: projection.value,
                        onPositionChanged: geoLocationChanged
                    })
                ]
            })

            const children = [mapComponents, controlsComponents]

            return h('div', {
                class: 'qa-map',
                style: (props.mapWidth ? 'width: ' + props.mapWidth : '')
            }, children)
        }
    }
}

